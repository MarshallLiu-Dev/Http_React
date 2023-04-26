import { useState, useEffect } from "react";

// hooks 

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    // refatorando o post 

    const [config, setConfig ] = useState(null);
    const [method, setMethod] = useState(null);
    const [ callFecth, setCallFecth] = useState(false);

    // loading 

    const [loading, setLoanding] = useState(false);
    
    // tratando erros 

    const [error , setError] = useState(null);

    // delete 

    const [itemId, setItemId] = useState(null);

    const httpConfig = (data, method) => {
        if(method === "POST"){
            setConfig({
                method, 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
        } else if(method === "DELETE"){
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                }
             
            });
            setMethod(method);
            setItemId(data);
        }
    };

    useEffect(() => {

        const fetchData = async () => {

            // loading 
            setLoanding(true)
            
            try {
                const res = await fetch(url);

                const json = await res.json();

                setData(json);

            } catch (error) {
                console.log(error.message);
                setError("Houve um Erro ao carregar os dados  ")
               
            }

            setLoanding(false);

        };

        fetchData();
    
    }, [url, callFecth]);

  // refatorando o post 

        useEffect(() =>{

                const httpResquest = async () =>  {

                    let json 

                    if (method === "POST") {
                
                    let fetchOptions = [url, config];

                    const res = await fetch(...fetchOptions);
                        
                           json = await res.json();

                              

                        } else if(method === "DELETE"){
                           
                            const deleteUrl = `${url}/${itemId}`


                            const res = await fetch(deleteUrl, config)

                           json = await res.json()

                            setCallFecth(json)
                        }
                        setCallFecth(json);
                    };

                httpResquest();

        }, [config, method, url]);

    return { data, httpConfig, loading, error };

};


