class Produto {

    constructor() {
        this.id = 1;
        this.arrayProduto = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();
        if (this.validaCampo(produto)) {
            if (this.editId === null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto)
            }
        }

        this.listaTabela();

        this.cancelar();
    }

    listaTabela() {

        let tbody = document.getElementById('tbody');
        tbody.innerText = ''

        for (let i = 0; i < this.arrayProduto.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProduto[i].id;
            td_produto.innerText = this.arrayProduto[i].nomeProduto;
            td_preco.innerText = this.arrayProduto[i].precoProduto;


            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar-texto.png';
            imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProduto[i]) + ")")

            let imgDelet = document.createElement('img');
            imgDelet.src = 'img/excluir.png';
            imgDelet.setAttribute("onclick", "produto.deletar(" + this.arrayProduto[i].id + ")")

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelet);
        }
    }

    adicionar(produto) {
        produto.precoProduto = parseFloat(produto.precoProduto);
        this.arrayProduto.push(produto);
        this.id++
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProduto.length; i++) {
            if (this.arrayProduto[i].id === id) {
                this.arrayProduto[i].nomeProduto = produto.nomeProduto;
                this.arrayProduto[i].precoProduto = produto.precoProduto;
            }
        }
    }

    preparaEdicao(dados) {
        this.editId = dados.id;

        document.getElementById('product').value = dados.nomeProduto;
        document.getElementById('price').value = dados.precoProduto;

        document.getElementById('btn1').innerHTML = 'Atualizar'
    }

    lerDados() {
        let produto = {};

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('product').value;
        produto.precoProduto = document.getElementById('price').value;

        return produto;
    }

    validaCampo(produto) {
        let msg = '';

        if (produto.nomeProduto === '') {
            msg += "Digite o nome do produto \n";
        }
        if (produto.precoProduto === '') {
            msg += "Digite o preço do produto \n";
        }

        if (msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
        document.getElementById('product').value = '';
        document.getElementById('price').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {
        let tbody = document.getElementById('tbody');

        if (confirm('Deseja realmente deletar o produto de ID: ' + id)) {
            for (let i = 0; i < this.arrayProduto.length; i++) {
                if (this.arrayProduto[i].id === id) {
                    this.arrayProduto.splice(i, 1)
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

let produto = new Produto();

