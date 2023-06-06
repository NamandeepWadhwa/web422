import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function PageHeader(props)
{
    return (<>
    
    <Card style={{ width: '18rem' }} className="bg-light">
      
      <Card.Body>
        {prop.text}
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <br />
    </>)
}