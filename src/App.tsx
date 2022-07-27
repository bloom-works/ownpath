
function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("common.title");
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="guided-search" element={<GuidedSearch />} />
          <Route path="result/:resultId" element={<ResultDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
