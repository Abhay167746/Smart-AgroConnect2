export default function ExpertForm() {
  return (
    <section className="rounded-2xl border border-emerald-200/40 bg-white p-6 shadow-xl">
      <h2 className="text-center text-2xl font-bold text-emerald-900">
        🤝 Connect with an Expert
      </h2>
      <form className="mx-auto mt-4 flex max-w-lg flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="rounded-lg border border-gray-200 p-3 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="rounded-lg border border-gray-200 p-3 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <textarea
          placeholder="Your Query..."
          rows="4"
          className="rounded-lg border border-gray-200 p-3 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit Query
        </button>
      </form>
    </section>
  );
}
