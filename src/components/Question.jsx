function Question({ question }) {
  return (
    <section className="text-center mt-16 text-gray-300 font-medium h-24 px-8"> {/* Ajusta la altura según sea necesario */}
      <span>{question}</span>
    </section>
  );
}

export default Question;
