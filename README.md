# v7petrov.github.io

Web portfolio as an alternative to just a google docs link.

## Resume PDF

The live site displays `assets/resume.pdf` through `resume.html`.

Edit the LaTeX source in `_resume/resume.tex`. When changes are pushed to `main`, GitHub Actions builds the PDF, stages a Pages artifact that includes `assets/resume.pdf`, and deploys the site. It also commits the generated PDF back to the repo when branch permissions allow it.

If Actions is disabled, render `_resume/resume.tex` locally or in Overleaf, export the PDF to `assets/resume.pdf`, then push.
