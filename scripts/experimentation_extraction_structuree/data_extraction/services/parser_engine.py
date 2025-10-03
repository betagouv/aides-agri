
def choose_parser(resource_path: str):
    if resource_path.endswith(".pdf"):
        from data_extraction.adapters.pdf_extractors import PDFExtractor
        return PDFExtractor()
    else:
        from data_extraction.adapters.html_extractor import HTMLExtractor
        return HTMLExtractor()