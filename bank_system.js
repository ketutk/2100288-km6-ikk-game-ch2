class BankAccount {
  #saldo = 0;
  #transactions = [];
  constructor(pemilik, norek) {
    this.pemilik = pemilik;
    this.norek = norek;
  }

  deposit(amount) {
    this.#addTransactions("Deposit", this.#saldo, amount, this.#saldo + amount);
    this.#saldo += amount;
    return true;
  }

  withdraw(amount) {
    this.#addTransactions("Withdrawal", this.#saldo, amount, this.#saldo - amount);
    this.#saldo -= amount;
    return true;
  }

  #addTransactions(type, curSaldo, amount, newSaldo) {
    this.#transactions.push({
      type,
      curSaldo,
      amount,
      newSaldo,
    });
    return;
  }

  getTransactions() {
    return this.#transactions;
  }

  getSaldo() {
    return this.#saldo;
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
      return;
    }
    Krisna.deposit(parseInt(isiSaldo));
    updateData();
    textSaldo.innerText = Krisna.getSaldo();
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
      return;
    }
    if (Krisna.getSaldo() - parseInt(isiSaldo) < 0) {
      alert("Gagal mengurangi saldo, anda tidak memiliki cukup saldo");
      return;
    }
    Krisna.withdraw(parseInt(isiSaldo));
    updateData();
    textSaldo.innerText = Krisna.getSaldo();
    alert("Berhasil mengurangi saldo");
  }, 500);
  return;
}

function updateData() {
  let dataTransactions = Krisna.getTransactions();
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
  dataTransactions.forEach((e) => {
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
