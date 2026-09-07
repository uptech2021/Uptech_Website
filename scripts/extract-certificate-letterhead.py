"""Extract the unmodified letterhead asset, not the signature, from the source PDF."""
from pathlib import Path
from pypdf import PdfReader

source = Path(r"D:/ourlime/Shareholders Certificate .pdf")
image = next(image for image in PdfReader(source).pages[0].images if image.name == "Image9.jpg")
Path("public/certificate-letterhead.jpg").write_bytes(image.data)
