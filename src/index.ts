import axios from "axios";
async function getUserFromGithub(user: string) {
  await axios
    .get(`https://api.github.com/users/${user}`)
    .then((response: { data: any }) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.log("Usuário não existe" + error);
    });
}

getUserFromGithub("djunior97");
getUserFromGithub("djunioriqdivqv97");

async function getRepositories(repo: string) {
  await axios
    .get(`https://api.github.com/repos/${repo}`)
    .then((response: { data: any }) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.log("Repositório não existe" + error);
    });
}
getRepositories("marcelo-growdev/scrapbook-es6");
getRepositories("marcelo-growdev/qdbqqbqwn");

/////////////////////////////////////////////////////////////////////////////////////
//Exercício 2
import express, { Request, Response } from "express";

const app = express();

app.get("/calculadora", (req: Request, res: Response) => {
  const operacao = req.query.operacao;
  const valorA = Number(req.query.valorA);
  const valorB = Number(req.query.valorB);

  if (operacao === "somar") {
    res.send({
      resultado: valorA + valorB,
    });
  } else if (operacao === "subtrair") {
    return res.send({
      resultado: valorA - valorB,
    });
  } else if (operacao === "multiplicar") {
    return res.send({
      resultado: valorA * valorB,
    });
  } else if (operacao === "dividir") {
    return res.send({
      resultado: valorA / valorB,
    });
  }
});

app.listen(2222, () => {
  console.log("Está rodando");
});

/////////////////////////////////////////////////////////////////////////////
// Criar uma rota, que toda vez que for chamada, adiciona +1 a um
// contador. Toda vez que esse contador chegar a 10, exibir mensagem
// “Chegou à 10” e resetar o contador;

let contador: number = 0;

app.get("/contador", (req, res) => {
  contador++;

  if (contador === 10) {
    contador = 0;
    return res.send({ mensagem: "Chegou à 10" });
  } else {
    res.send({ contador });
  }
});

/////////////////////////////////////////////////////////////////////
// Criar uma rota chamada numeral, que terá como query param um
// número a ser processado. Nesta rota deverá ter também uma query
// param chamada operação contendo um dos seguintes valores:
// anterior ou proximo. Caso o valor seja anterior, deverá ser retornado
// o valor anterior ao passado no query param, caso o valor seja
// proximo, deverá retornar o próximo valor ao número passado.

app.get("/numeral", (req, res) => {
  const valor = Number(req.query.valor);
  let operacao = String(req.query.operacao);

  if (operacao === "Anterior") {
    let result = valor - 1;
    return res.send({
      operacao: operacao,
      numero: valor,
      resultado: result,
    });
  } else if (operacao === "Proximo") {
    let result = valor + 1;
    return res.send({
      operacao: operacao,
      numero: valor,
      resultado: result,
    });
  }
});

/////////////////////////////////////////////////////////////////////////
// Criar uma rota chamada inverter-string, essa rota deverá ter uma
// query param chamada valor. Esse valor recebido deverá ser
// invertido e retornado.

app.get("/inverter-string", (req, res) => {
  let valor = String(req.query.valor);

  function reverse(valor: string) {
    return valor.split("").reverse().join("");
  }

  var result = reverse(valor);
  res.send({ Resultado: result });
});

////////////////////////////////////////////////////////////////////////
// Criar uma rota chamada remover-vogais, essa rota deverá ter uma
// query param chamada valor. Esse valor recebido deverá ser salvo
// em um array, e toda vez que a rota for chamada, deverá salvar o
// valor nesse mesmo array. Antes de salvar o valor/string no array,
// deverá ser removido todas as vogais, deixando apenas as
// consoantes na string. Sempre que a rota for chamada, deverá ser
// exibido em forma de json o array contendo todas as strings.

let array: string[] = [];
app.get("/remover-vogais", (req, res) => {
  let valor = String(req.query.valor);

  function removeVogaisString(valor: string) {
    return valor.replace(/[a|e|i|o|u|à|ú]/gi, "");
  }

  var resultado = removeVogaisString(valor);

  array.push(resultado);

  res.send({ array });
});
