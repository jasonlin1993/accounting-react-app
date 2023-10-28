import Form from "./Form";

export default function Accounting() {
  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
}
