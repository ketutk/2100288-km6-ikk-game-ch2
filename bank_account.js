let textSaldo = document.getElementById("text-saldo");
let saldo = 0;
let numberRegEx = /^(?!0\d)\d+$/;
let data = document.getElementById("tableData");
let dataHistory = [];

function tambahSaldo() {
  let isiSaldo = prompt("Masukkan jumlah saldo yang ingin ditambahkan : ");
  if (!isiSaldo.match(numberRegEx)) {
    alert("Gagal menambah saldo, mohon masukkan input yang valid");
    tambahSaldo();
  } else {
    updateData(saldo, isiSaldo, saldo + parseInt(isiSaldo));
    saldo += parseInt(isiSaldo);
    textSaldo.innerText = saldo;
  }
  return;
}

function kurangSaldo() {
  let isiSaldo = prompt("Masukkan jumlah pengurangan saldo : ");
  if (!isiSaldo.match(numberRegEx)) {
    alert("Gagal mengurangi saldo, mohon masukkan input yang valid");
    kurangSaldo();
  }
  if (saldo - parseInt(isiSaldo) < 0) {
    alert("Gagal mengurangi saldo, anda tidak memiliki cukup saldo");
    kurangSaldo();
  } else {
    updateData(saldo, `-${isiSaldo}`, saldo - parseInt(isiSaldo));
    saldo -= parseInt(isiSaldo);
    textSaldo.innerText = saldo;
  }
  return;
}

function updateData(before, change, now) {
  dataHistory.push({ before, change, now });
  let table = "";
  table += `
  <table>
          <tr>
            <th>Sebelum</th>
            <th>Perubahan</th>
            <th>Hasil</th>
          </tr>
  `;
  dataHistory.forEach((e) => {
    table += `<tr>
        <td>${e.before}</td>
        <td>${e.change}</td>
        <td>${e.now}</td>
        </tr>`;
  });
  table += `
  </table>
  `;
  data.innerHTML = table;
  return;
}
