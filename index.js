


const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");


const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./cert.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  const fontBytes2 = await fetch("./YatraOne-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  const YatraOneFont = await pdfDoc.embedFont(fontBytes2);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 380,
    y: 320,
    size: 35,
    font: YatraOneFont,
    color: rgb(0, 0, 0),
    /*color: rgb(0.2, 0.84, 0.67),*/
  });

let completiondate  = "3 October 2021"
  firstPage.drawText(completiondate, {
    x: 545,
    y: 248,
    size: 12,
    font: SanChezFont,
    color: rgb(0,0,0),
    /*color: rgb(0.2, 0.84, 0.67),*/
  });


  const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
      const dateObj = new Date();
      const month = monthNames[dateObj.getMonth()];
      const day = String(dateObj.getDate()).padStart(2, '0');
      const year = dateObj.getFullYear();
      const certdate = day + " " + month + ", " + year;
  firstPage.drawText(certdate, {
    x: 360,
    y: 140,
    size: 13,
    font: SanChezFont,
    color: rgb(0.4,0.4,0.4),
    /*color: rgb(0.2, 0.84, 0.67),*/
  });


  function makeid(length) {
      var result           = '';
      var characters       = 'A4BCDE5FGHI1JKL6MN2OPQRS3TUVWXYZ789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
   charactersLength));
     }
     return result;
  }

  let certno = 'iHUB-'+ makeid(8);

    firstPage.drawText(certno, {
      x: 480,
      y: 35,
      size: 10,
      font: SanChezFont,
      color: rgb(0.4,0.4,0.4),
      /*color: rgb(0.2, 0.84, 0.67),*/
    });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  alert("Certificate Downloaded");

  console.log("Certificate Created");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  let randname = (Math.random() + 1).toString(36).substring(7);

  var file = new File(
    [pdfBytes], "certificate_"+randname+".pdf",
  /*  "Padhega India Subscription Certificate.pdf", */
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();
