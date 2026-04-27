import NecessidadeCard from './NecessidadeCard';

function NecessidadesList({ necessidades }) {
  return (
    <section>
      <h2>Necessidades dos abrigos</h2>

      {necessidades.length === 0 && <p>Nenhuma necessidade cadastrada.</p>}

      <div className="cards-container">
        {necessidades.map((necessidade) => (
          <NecessidadeCard key={necessidade.id} necessidade={necessidade} />
        ))}
      </div>
    </section>
  );
}

export default NecessidadesList;
