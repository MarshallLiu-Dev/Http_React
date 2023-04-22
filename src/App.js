//css
import './App.css';
// imports
import { useState, useEffect } from 'react';

  const url = " http://localhost:3000/products"


function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

 //resgatanto dados 
  useEffect(() => {

    async function fetchData(){
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }
      fetchData();
  }, []);

  // console.log(products);
//  add produtos 
  const handleSubmit = async (e) => {

    e.preventDefault();
   
   const product = {
    name,
    price,
   };

   const res = await fetch(url, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
   });

// carregamento dinamico 
    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct]);
   
    setName("");
    setPrice("");
  };

  return (
    <div className="App">
        <h1>Lista de produtos <hr /></h1>
       
        <ul>
         {products.map((product) => (
          <li key= {product.id}>
             {product.name} - R$: {product.price}

          </li>
         ))}  
        <hr />
        </ul>
      <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>
              Preço:
              <input className= "price"
                type="number"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <input type="submit" className='btn' value="Criar" />
            {/* 7 - state de loading no post */}
            {/* {loading ? <p>Aguarde!</p> : <input type="submit" value="Criar" />} */}
          </label>
          </form>
          </div>
    </div>
  );
}

export default App;
