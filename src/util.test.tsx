import {
  AccessibilityOptions,
  ACCESSIBILITY_OPTIONS,
  CareProvider,
  DailyHours,
  DayOfWeek,
  FeePreference,
  FEE_PREFERENCES,
  Languages,
  LANGUAGES,
  MentalHealthServices,
  MENTAL_HEALTH_SERVICES,
  PopulationsServed,
  POPULATIONS_SERVED,
  SubstanceUseServices,
  SUBSTANCE_USE_SERVICES,
  TypeOfHelp,
} from "./types";
import {
  DEFAULT_RADIUS_MILES,
  addSearchMetadata,
  isWithinRadius,
  compareDistance,
  getMatchingCare,
  EMPTY_SEARCH_FILTERS,
  getZipSearchMetadata,
  DEFAULT_DENSE_RADIUS_MILES,
  offersTypeOfHelp,
  offersAnyTypesOfHelpNeeded,
  meetsAnyFeePreference,
  meetsAccessibilityNeeds,
  isOpenOnSelectedDays,
  supportsLanguages,
  DEFAULT_SPARSE_RADIUS_MILES,
} from "./util";

const DUMMY_CARE_PROVIDER: CareProvider = {
  id: "1",
  name: "Care Provider",
  phone: "123-456-7890",
  hideAddress: false,
  address: [],
  website: "",
  substanceUse: {
    supported: false,
    duiSupported: false,
    services: SUBSTANCE_USE_SERVICES.reduce((map, val) => {
      map[val] = false;
      return map;
    }, {} as { [key in SubstanceUseServices]: boolean }),
  },
  mentalHealth: {
    supported: false,
    services: MENTAL_HEALTH_SERVICES.reduce((map, val) => {
      map[val] = false;
      return map;
    }, {} as { [key in MentalHealthServices]: boolean }),
  },
  populationsServed: POPULATIONS_SERVED.reduce((map, val) => {
    map[val] = false;
    return map;
  }, {} as { [key in PopulationsServed]: boolean }),
  hours: null,
  accessibility: ACCESSIBILITY_OPTIONS.reduce((map, val) => {
    map[val] = false;
    return map;
  }, {} as { [key in AccessibilityOptions]: boolean }),
  fees: FEE_PREFERENCES.reduce((map, val) => {
    map[val] = false;
    return map;
  }, {} as { [key in FeePreference]: boolean }),
  languages: LANGUAGES.reduce((map, val) => {
    map[val] = false;
    return map;
  }, {} as { [key in Languages]: boolean }),
  latlng: null,
};

// An invalid zipcode
const INVALID_ZIP = "123";
// A zipcode in NY
const VALID_NOT_CO_ZIP = "10001";
// A zipcode in Denver, CO
const VALID_CO_ZIP = "80205";
// A point close to Denver zipcode center, within DEFAULT_RADIUS
const CLOSE = { lat: 39.74881, lng: -104.946169 };
// A point further away from Denver zipcode center, within DEFAULT_RADIUS
const FURTHER = { lat: 39.751298, lng: -105.000184 };
// A point further away from Denver zipcode radius, outside DEFAULT_RADIUS
const FAR = { lat: 37.938865, lng: -107.812949 };

describe("addSearchMetadata", () => {
  test("it adds distance to CareProviders with lat/lng data", () => {
    const DATA = [
      {
        ...DUMMY_CARE_PROVIDER,
        id: "no-distance",
      },
      {
        ...DUMMY_CARE_PROVIDER,
        latlng: FURTHER,
        id: "distance",
      },
    ];
    const results = addSearchMetadata(DATA, CLOSE);

    // All data should be returned
    expect(results).toHaveLength(2);

    // Entity without lat/lng data should have distance = undefined
    const noDistance = results.find((result) => result.id === "no-distance");
    expect(noDistance).toHaveProperty("distance");
    expect(noDistance?.distance).toBeUndefined();

    // Entity with lat/lng data should have distance = some positive number
    const distance = results.find((result) => result.id === "distance");
    expect(distance).toHaveProperty("distance");
    expect(distance?.distance).not.toBeUndefined();
    expect(distance?.distance).toBeGreaterThan(0);
  });
});

describe("isWithinRadius", () => {
  test.each([
    [100, 5, true],
    [100000, 5, false],
  ])(
    "it returns true if distance is < miles",
    (distanceMeters, radiusMiles, expected) => {
      const result = isWithinRadius(
        { ...DUMMY_CARE_PROVIDER, distance: distanceMeters },
        radiusMiles
      );
      expect(result).toEqual(expected);
    }
  );

  test("it returns false if there is no distance", () => {
    const result = isWithinRadius(DUMMY_CARE_PROVIDER, 1000);
    expect(result).toEqual(false);
  });
});

describe("compareDistance", () => {
  test("it returns CareProviders sorted by distance with undefined at the end", () => {
    const sorted = [
      { ...DUMMY_CARE_PROVIDER, id: "undefined" },
      { ...DUMMY_CARE_PROVIDER, id: "one", distance: 1 },
      { ...DUMMY_CARE_PROVIDER, id: "one hundred", distance: 100 },
    ].sort(compareDistance);

    expect(sorted[0].id).toEqual("one");
    expect(sorted[1].id).toEqual("one hundred");
    expect(sorted[2].id).toEqual("undefined");
  });
});

describe("getMatchingCare", () => {
  describe("bad zip", () => {
    test("it returns no results if provided zip is not valid - length < 5", () => {
      const { results } = getMatchingCare([DUMMY_CARE_PROVIDER], {
        ...EMPTY_SEARCH_FILTERS,
        zip: INVALID_ZIP,
        miles: `${DEFAULT_RADIUS_MILES}`,
      });
      expect(results.length).toEqual(0);
    });

    test("it returns no results if provided zip is not valid - not in CO list", () => {
      const { results } = getMatchingCare([DUMMY_CARE_PROVIDER], {
        ...EMPTY_SEARCH_FILTERS,
        zip: VALID_NOT_CO_ZIP,
        miles: `${DEFAULT_RADIUS_MILES}`,
      });
      expect(results.length).toEqual(0);
    });
  });

  test("it returns CareProviders within radius, excluding those that are too far or do not have lat/lng data", () => {
    const DATA = [
      {
        ...DUMMY_CARE_PROVIDER,
        id: "no-distance",
      },
      {
        ...DUMMY_CARE_PROVIDER,
        id: "close",
        latlng: CLOSE,
      },
      {
        ...DUMMY_CARE_PROVIDER,
        id: "further",
        latlng: FURTHER,
      },
      {
        ...DUMMY_CARE_PROVIDER,
        id: "far",
        latlng: FAR,
      },
    ];

    const { results } = getMatchingCare(DATA, {
      ...EMPTY_SEARCH_FILTERS,
      zip: VALID_CO_ZIP,
      miles: `${DEFAULT_RADIUS_MILES}`,
    });

    // Only 'close' and 'further' should be returned in results
    expect(results).toHaveLength(2);

    // and results should be sorted by distance
    expect(results[0].id).toEqual("close");
    expect(results[1].id).toEqual("further");
  });
});

describe("getZipSearchMetadata", () => {
  test("detects invalid zips", () => {
    const noZip = getZipSearchMetadata("");
    const badZip = getZipSearchMetadata("123");
    const zipOutsideColorado = getZipSearchMetadata("90210");
    expect(noZip.isValidZip).toEqual(false);
    expect(badZip.isValidZip).toEqual(false);
    expect(zipOutsideColorado.isValidZip).toEqual(false);
  });

  test("sets a smaller radius for high-density zips", () => {
    const denverZip = getZipSearchMetadata("80203");
    expect(denverZip.isValidZip && denverZip.defaultRadiusMiles).toEqual(
      DEFAULT_DENSE_RADIUS_MILES
    );
  });

  test("sets default radius for mid-density zips", () => {
    const woodyCreek = getZipSearchMetadata("81656");
    expect(woodyCreek.isValidZip && woodyCreek.defaultRadiusMiles).toEqual(
      DEFAULT_RADIUS_MILES
    );
  });
  test("sets larger radius for low-density zips", () => {
    const vailZip = getZipSearchMetadata("81657");
    expect(vailZip.isValidZip && vailZip.defaultRadiusMiles).toEqual(
      DEFAULT_SPARSE_RADIUS_MILES
    );
  });
});

describe("offersTypeOfHelp", () => {
  test("identifies if court mandated treatment is supported", () => {
    const duiSupportedProvider = {
      ...DUMMY_CARE_PROVIDER,
      substanceUse: {
        ...DUMMY_CARE_PROVIDER.substanceUse,
        duiSupported: true,
      },
    };
    const intensiveOutpatient = {
      ...DUMMY_CARE_PROVIDER,
      mentalHealth: {
        ...DUMMY_CARE_PROVIDER.mentalHealth,
        services: {
          ...DUMMY_CARE_PROVIDER.mentalHealth.services,
          IntensiveOutpatient: true,
        },
      },
    };
    expect(
      offersTypeOfHelp(DUMMY_CARE_PROVIDER, TypeOfHelp.CourtMandatedTreatment)
    ).toEqual(false);
    expect(
      offersTypeOfHelp(duiSupportedProvider, TypeOfHelp.CourtMandatedTreatment)
    ).toEqual(true);
    expect(
      offersTypeOfHelp(intensiveOutpatient, TypeOfHelp.CourtMandatedTreatment)
    ).toEqual(true);
  });
});

describe("offersAnyTypesOfHelpNeeded", () => {
  test("true if some but not all types of help are offered", () => {
    const substanceUseProvider = {
      ...DUMMY_CARE_PROVIDER,
      substanceUse: {
        ...DUMMY_CARE_PROVIDER.substanceUse,
        supported: true,
      },
    };
    expect(
      offersAnyTypesOfHelpNeeded(substanceUseProvider, [
        TypeOfHelp.MentalHealth,
      ])
    ).toEqual(false);
    expect(
      offersAnyTypesOfHelpNeeded(substanceUseProvider, [
        TypeOfHelp.SubstanceUse,
        TypeOfHelp.MentalHealth,
      ])
    ).toEqual(true);
  });

  test("true if no types of help are specified", () => {
    expect(offersAnyTypesOfHelpNeeded(DUMMY_CARE_PROVIDER, [])).toEqual(true);
    expect(
      offersAnyTypesOfHelpNeeded(DUMMY_CARE_PROVIDER, [TypeOfHelp.None])
    ).toEqual(true);
    expect(
      offersAnyTypesOfHelpNeeded(DUMMY_CARE_PROVIDER, [TypeOfHelp.Unsure])
    ).toEqual(true);
  });
});

describe("meetsFeePreferences", () => {
  test("true if no fee preferences are specified", () => {
    expect(meetsAnyFeePreference(DUMMY_CARE_PROVIDER, [])).toEqual(true);
  });

  test("true if some but not all fee preferences are offered", () => {
    const medicaidProvider = {
      ...DUMMY_CARE_PROVIDER,
      fees: { ...DUMMY_CARE_PROVIDER.fees, Medicaid: true },
    };
    expect(
      meetsAnyFeePreference(medicaidProvider, ["SlidingFeeScale"])
    ).toEqual(false);
    expect(
      meetsAnyFeePreference(medicaidProvider, ["SlidingFeeScale", "Medicaid"])
    ).toEqual(true);
  });
});

describe("meetsAccessibilityNeeds", () => {
  test("true if no accessibility needs are specified", () => {
    expect(meetsAccessibilityNeeds(DUMMY_CARE_PROVIDER, [])).toEqual(true);
  });

  test("true only if all needs are met", () => {
    const wheelchairProvider = {
      ...DUMMY_CARE_PROVIDER,
      accessibility: { ...DUMMY_CARE_PROVIDER.accessibility, Wheelchair: true },
    };
    const wheelchairAndDeafProvider = {
      ...wheelchairProvider,
      accessibility: {
        ...wheelchairProvider.accessibility,
        "Deaf/HardofHearing": true,
      },
    };
    expect(meetsAccessibilityNeeds(wheelchairProvider, ["Wheelchair"])).toEqual(
      true
    );
    expect(
      meetsAccessibilityNeeds(wheelchairProvider, [
        "Wheelchair",
        "Deaf/HardofHearing",
      ])
    ).toEqual(false);
    expect(
      meetsAccessibilityNeeds(wheelchairAndDeafProvider, [
        "Wheelchair",
        "Deaf/HardofHearing",
      ])
    ).toEqual(true);
  });
});

describe("isOpenOnSelectedDays", () => {
  test("true if no days are specified", () => {
    expect(isOpenOnSelectedDays(DUMMY_CARE_PROVIDER, [])).toEqual(true);
  });

  test("false if days are specified but provider does not have hours", () => {
    expect(
      isOpenOnSelectedDays(DUMMY_CARE_PROVIDER, [DayOfWeek.Sunday])
    ).toEqual(false);
  });

  test("true if open on some but not all days", () => {
    const closed: DailyHours = { open: false };
    const satProvider = {
      ...DUMMY_CARE_PROVIDER,
      hours: {
        monday: closed,
        tuesday: closed,
        wednesday: closed,
        thursday: closed,
        friday: closed,
        saturday: { open: true, start: "7:00am", end: "7:00pm" },
        sunday: closed,
      },
    };
    expect(isOpenOnSelectedDays(satProvider, [DayOfWeek.Sunday])).toEqual(
      false
    );
    expect(
      isOpenOnSelectedDays(satProvider, [DayOfWeek.Sunday, DayOfWeek.Saturday])
    ).toEqual(true);
  });
});

describe("supportsLanguages", () => {
  test("true if no languages are specified", () => {
    expect(supportsLanguages(DUMMY_CARE_PROVIDER, [])).toEqual(true);
  });

  test("true if english is selected", () => {
    expect(supportsLanguages(DUMMY_CARE_PROVIDER, ["English"])).toEqual(true);
  });

  test("true if some but not all languages supported", () => {
    const spanishProvider = {
      ...DUMMY_CARE_PROVIDER,
      languages: {
        ...DUMMY_CARE_PROVIDER.languages,
        Spanish: true,
      },
    };
    expect(supportsLanguages(spanishProvider, ["Spanish"])).toEqual(true);
    expect(supportsLanguages(spanishProvider, ["Spanish", "Mandarin"])).toEqual(
      true
    );
    expect(supportsLanguages(spanishProvider, ["Mandarin"])).toEqual(false);
  });
});
