const form1 = document.getElementById("form1");

let questionAnswer;
let ammount;
let randomT;
let randomN;
let historyA = [];

const p = document.createElement("p");
p.textContent = "No recorded answers! Generate an answer first.";

form1.addEventListener("submit", function (e) {
    e.preventDefault();

    document.getElementById("error").textContent = "";

    const data1 = new FormData(form1);
    questionAnswer = data1.get("t");

    if (questionAnswer === null) {
        document.getElementById("error").textContent = "Please select one option!";
        return;
    } else if (questionAnswer === "numbered") {
        ammount = document.getElementById("ammount").value;

        if (ammount === "") {
            document.getElementById("error").textContent = "Please enter number of questions!";
            return;
        } else if (ammount <= 0) {
            document.getElementById("error").textContent = "Please enter value above 0!";
            return;
        } else if (!Number.isInteger(Number(ammount))) {
            document.getElementById("error").textContent = "Please enter integer!";
            return;
        }
    }

    if (questionAnswer === "listed") {
        home.hidden = true;
        next1.hidden = false;
    } else {
        home.hidden = true;
        next2.hidden = false;
        generate1();
    }
});


function restart() {
    if (!confirm("Restart everything? This action cannot be undone.")) {
        return;
    }

    document.getElementById("form1").reset();
    rows.replaceChildren();
    addRow(false);
    addRow(true);
    addRow(true);
}


function addRow(removable = true) {
    const rows = document.getElementById("rows");
    const row = document.createElement("li");

    row.className = "row";

    row.innerHTML = `
        <input type="text" placeholder="Answer Choice" class="answer">
        ${
            removable
                ? '<button onclick="this.parentElement.remove()" class="trash">🗑️</button>'
                : ''
        }
    `;

    rows.appendChild(row);
}


function generate2() {
    const answers = Array.from(document.querySelectorAll(".answer"))
        .filter(item => item.value.trim() !== "");

    randomT = answers[Math.floor(Math.random() * answers.length)].value;

    document.getElementById("answer2").textContent = randomT.toUpperCase();
    p2.hidden = false;

    historyA.push(`Option "${randomT}"`);
}


function check() {
    document.getElementById("error1").textContent = "";

    const answers = Array.from(document.querySelectorAll(".answer"))
        .filter(item => item.value.trim() !== "");

    if (answers.length <= 1) {
        document.getElementById("error1").textContent = "Fill in at least 2 options!";
        return;
    }

    next1a.hidden = true;
    next1b.hidden = false;

    generate2();
}


function copyText() {
    navigator.clipboard.writeText(`Option "${randomT}"`);
    document.getElementById("copyT").textContent = "📋 Copied!";
}


function generate1() {
    randomN = Math.floor(Math.random() * Number(ammount)) + 1;

    document.getElementById("answer1").textContent = randomN;
    p1.hidden = false;

    historyA.push(`Option #${randomN}`);
}


function copyNumber() {
    navigator.clipboard.writeText(`Option #${randomN}`);
    document.getElementById("copyN").textContent = "📋 Copied!";
}


function viewHistory(historyA) {
    historyContent.replaceChildren();

    if (historyA.length === 0) {
        document.getElementById("historyContent").appendChild(p);
    } else {
        const historyList = document.createElement("ol");
        historyList.id = "historyList";

        document.getElementById("historyContent").appendChild(historyList);

        for (const item of historyA.toReversed()) {
            const historyItem = document.createElement("li");
            historyItem.textContent = item;

            document.getElementById("historyList").appendChild(historyItem);
        }

        mostRecentAtTop.hidden = false;
    }
}


function clearHistory(historyA) {
    if (!confirm("Do you want to clear history? This action cannot be undone.")) {
        return;
    }

    historyA.length = 0;
    historyContent.replaceChildren(p);
    mostRecentAtTop.hidden = true;
}


function copyHistory() {
    const text = [...document.querySelectorAll("#historyList li")]
        .map(li => li.textContent)
        .join("\n");

    navigator.clipboard.writeText(text);
    document.getElementById("copyH").textContent = "📋 Copied!";
}


addRow(false);
addRow(true);
addRow(true);
