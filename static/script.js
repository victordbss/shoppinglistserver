const socket = io();

socket.on("update_list", function(articles) {
    const ul = document.getElementById("articles");
    ul.innerHTML = "";
    articles.forEach(element => {
        const li = document.createElement("li");
        li.classList.add("article-item");
        li.textContent = element + " ";
        const delBtn = document.createElement('button');
        delBtn.classList.add("del-btn");
        delBtn.textContent = "🗑️";
        delBtn.onclick = () => removeArticle(element);
        li.appendChild(delBtn);
        ul.appendChild(li);
    });
});

document.getElementById("article-form").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("add_article")
    const input = document.getElementById("article-input");
    const article = input.value.trim();
    if (article) {
        socket.emit("add_article", {"article" : article});
        input.value = "";
        input.focus();
    }
})


function removeArticle (article) {
    socket.emit("remove_article", {"article" : article});
};


document.getElementById('pdf-btn').addEventListener('click', () => {
    console.log("pdf")
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR').replace(/\//g, '-'); 
    const items = document.querySelectorAll('#articles li');
    const produits = Array.from(items).map(li => `• ${li.childNodes[0].textContent.trim()}`);
    const doc = new window.jspdf.jsPDF();
    doc.setFontSize(16);
    doc.text(`Ma liste de courses (${dateStr})`, 20, 20);
    doc.setFontSize(12);
    produits.forEach((prod, i) => {
        doc.text(prod, 20, 30 + i * 8);
    });



    // format "18-08-2025"
    const fileName = `liste_de_course_${dateStr}.pdf`;
    // Télécharge le PDF
    // Génère le PDF en blob
    const pdfBlob = doc.output('blob');
    // Crée une URL pour le blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName; // ⬅️ important pour forcer le nom du fichier
    document.body.appendChild(link);
    link.click();


    doc.save(fileName);

});