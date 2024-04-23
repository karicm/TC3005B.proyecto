// Container with the information of the service, problem and buttons
import "../styles/service.css";
import Button from '@mui/material/Button';

const Service = (props) => {
    return (
        <section className="service">
            <div className="titulo">
                <h2>Servicio</h2>
            </div>
            <div className="tarjetaProblema">
                <h2>Problema</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel leo ac nulla accumsan sollicitudin. Donec pellentesque nisl et nunc malesuada sollicitudin. Integer pharetra iaculis elit, vel dictum tortor vehicula ac. Phasellus sagittis erat sed dolor pellentesque pellentesque</p>
                <p>SOI</p>
            </div>
            <div className="botones">
                <Button variant="outlined">Ayuda soporte</Button>
                <Button variant="outlined">Reporte</Button>
                <Button variant="outlined" color="error">Ayuda supervisor</Button>
            </div>
        </section>
    );
}

export default Service;