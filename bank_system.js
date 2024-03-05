class BankAccount {
  constructor(pemilik, norek) {
    this.pemilik = pemilik;
    this.norek = norek;
    this.saldo = 0;
    this.transactions = [];
  }

  deposit(amount) {
    this.addTransactions("Deposit", this.saldo, amount, this.saldo + amount);
    this.saldo += amount;
    return true;
  }

  withdraw(amount) {
    this.addTransactions("Withdrawal", this.saldo, amount, this.saldo - amount);
    this.saldo -= amount;
    return true;
  }

  addTransactions(type, curSaldo, amount, newSaldo) {
    this.transactions.push({
      type,
      curSaldo,
      amount,
      newSaldo,
    });
    return;
  }
}

const Krisna = new BankAccount("Krisna", "02341398");

let textSaldo = document.getElementById("text-saldo");
let numberRegEx = /^(?!0\d)\d+$/;
let data = document.getElementById("tableData");

function tambahSaldo() {
  let isiSaldo = prompt("Masukkan jumlah saldo yang ingin ditambahkan : ");
  if (!isiSaldo) {
    return;
  }
  alert("Transaksi sedang diproses, mohon tunggu...");
  setTimeout(() => {
    if (!isiSaldo.match(numberRegEx)) {
      alert("Gagal menambah saldo, mohon masukkan input yang valid");
      tambahSaldo();
      return;
    }
    Krisna.deposit(parseInt(isiSaldo));
    updateData();
    textSaldo.innerText = Krisna.saldo;
    alert("Berhasil menambah saldo");
  }, 500);
  return;
}

function kurangSaldo() {
  let isiSaldo = prompt("Masukkan jumlah pengurangan saldo : ");
  if (!isiSaldo) {
    return;
  }
  alert("Transaksi sedang diproses, mohon tunggu...");
  setTimeout(() => {
    if (!isiSaldo.match(numberRegEx)) {
      alert("Gagal mengurangi saldo, mohon masukkan input yang valid");
      kurangSaldo();
      return;
    }
    if (Krisna.saldo - parseInt(isiSaldo) < 0) {
      alert("Gagal mengurangi saldo, anda tidak memiliki cukup saldo");
      kurangSaldo();
      return;
    }
    Krisna.withdraw(parseInt(isiSaldo));
    updateData();
    textSaldo.innerText = Krisna.saldo;
    alert("Berhasil mengurangi saldo");
  }, 500);
  return;
}

function updateData() {
  let table = "";
  table += `
  <table>
          <tr>
            <th>Tipe</th>
            <th>Saldo Awal</th>
            <th>Jumlah</th>
            <th>Saldo Akhir</th>
          </tr>
  `;
  Krisna.transactions.forEach((e) => {
    table += `<tr>
        <td>${e.type}</td>
        <td>${e.curSaldo}</td>
        <td>${e.amount}</td>
        <td>${e.newSaldo}</td>
        </tr>`;
  });
  table += `
  </table>
  `;
  data.innerHTML = table;
  return;
}
