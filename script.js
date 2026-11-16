// መጀመሪያ ገጹ ሲከፈት የሚታዩ ነባር መረጃዎች (Default Database Records)
const defaultData = [
    { id: 1, title: "Campus Security System", category: "Final Year Project", detail: "የተማሪዎችን ንብረት ስርቆት የሚከላከል ሲስተም" },
    { id: 2, title: "School Management System", category: "Web & Database", detail: "ለደባርቅ ዩኒቨርሲቲ ማህበረሰብ ት/ቤት የተሰራ" },
    { id: 3, title: "Personal Portfolio", category: "HTML/CSS/JS", detail: "በ GitHub Pages ላይ የተለቀቀ የግል ድረ-ገጽ" }
];

// ከ LocalStorage መረጃዎችን ማምጣት (ከሌለ ነባሩን ይጠቀማል)
let database = JSON.parse(localStorage.getItem('abayDatabase')) || defaultData;

const tableBody = document.getElementById('tableBody');
const dbForm = document.getElementById('dbForm');

// ሰንጠረዡን (Table) በመረጃ የመሙላት ተግባር
function renderTable() {
    tableBody.innerHTML = '';
    database.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.title}</strong></td>
            <td>${item.category}</td>
            <td>${item.detail}</td>
            <td><button class="delete-btn" onclick="deleteRecord(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
    // በ LocalStorage ውስጥ ማስቀመጥ
    localStorage.setItem('abayDatabase', JSON.stringify(database));
}

// አዲስ መረጃ ወደ ሰንጠረዡ መጨመር
dbForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('infoTitle').value;
    const category = document.getElementById('infoCategory').value;
    const detail = document.getElementById('infoDetail').value;

    database.push({
        id: database.length + 1,
        title: title,
        category: category,
        detail: detail
    });

    renderTable();
    dbForm.reset();
});

// መረጃን ከሰንጠረዡ ማጥፋት
function deleteRecord(index) {
    if (confirm("ይህንን መረጃ ከሰንጠረዡ ማጥፋት ይፈልጋሉ?")) {
        database.splice(index, 1);
        renderTable();
    }
}

// Contact Form መልዕክት መላኪያ
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const statusMsg = document.getElementById('contactStatus');
    statusMsg.textContent = `አመሰግናለሁ ${name}! መልዕክትዎ በተሳካ ሁኔታ ተልኳል።`;
    this.reset();
});

// ገጹ ሲከፈት ሰንጠረዡን አሳይ
renderTable();