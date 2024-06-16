import Message from "./Message";
import { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import "../styles/sentiment.css"
import { useLogInContext } from "../Providers/LogInContext";
import { useLlamadaContext } from "../Providers/LlamadaContext";


const Chatbox = (props) => {

  const [,,,cambiarSentimientoLlamada] = useLlamadaContext();

  const endRef = useRef(null)
  const [agent,,] = useLogInContext(); 

  const [messages, setMessages] = useState([]);

  useEffect(() => {
      endRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const [lastCustomerSentiment, setLastCustomerSentiment] = useState(null);

  useEffect(() => {
    const fetchMessages = () => {
      fetch(`http://44.209.22.101:8080/connect/sentiment/${props.id}`, 
        {headers: { "Authorization" : `Bearer ${agent.Token}`}})
        .then(console.log("TOKEN", agent.Token))
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMessages(data);
          const lastCustomerMessage = [...data].reverse().find((msg) => msg.role === "CUSTOMER");
          if (lastCustomerMessage) {
            cambiarSentimientoLlamada({SentimientoLlamada: lastCustomerMessage.sentiment });
            setLastCustomerSentiment(lastCustomerMessage.sentiment);
          }
        })
        .then(console.log(messages))
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 2500  );

    return () => clearInterval(intervalId);
  }, []);

  const updateSentiment = useCallback( async () => {
    if (lastCustomerSentiment){
      try{
        const datos = {
          id: props.id,
          sentiment: lastCustomerSentiment
        }
        let config = {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${agent.Token}`,
          },
          body: JSON.stringify(datos)
        }
        let res = await fetch("http://44.209.22.101:8080/llamada/cambiarSentiment", config) 
        if (!res.ok) {
          throw new Error('La solicitud no pudo completarse con éxito');
        }
      } catch (error){
        console.log(error)
      }
    }
  }, [lastCustomerSentiment])

  useEffect(() => {
    updateSentiment();
  }, [updateSentiment])


  return (
    <div className="container">
      <div className="titulo-transcripcion">
          Transcript
      </div>
      <div className="center">
        {messages.map((mensaje) => (
          <Message
            key={uuidv4()}
            name={mensaje.role}
            time={mensaje.startTime}
            content={mensaje.content}
            emotion={mensaje.sentiment}
            title={mensaje.role}
          />
        ))}
        <div ref={endRef}></div>   
      </div>
    </div>
  );
};

export default Chatbox;