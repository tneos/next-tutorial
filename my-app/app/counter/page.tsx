import Counter from "@/components/Counter";

// Nest client component inside the server one
function CounterPage() {
  return (
    <section>
      <h1 className="text-6xl mb-16">Page Content</h1>
      <Counter />
    </section>
  );
}
export default CounterPage;
