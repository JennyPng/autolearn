from pypdf import PdfReader

reader = PdfReader("./test/cybersylla.pdf")

# get rid of unnecessary text- just need learning goals, course description, assignments


for page in reader.pages:
    print(page.extract_text())
    print("---")