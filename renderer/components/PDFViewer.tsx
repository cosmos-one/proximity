export const PDFViewer = ({ pdfData}) => {
    const fileUrl = URL.createObjectURL(new Blob([pdfData], { type: "application/pdf" }));
    return <embed src={fileUrl} type="application/pdf" className="w-full h-full"/>;
};