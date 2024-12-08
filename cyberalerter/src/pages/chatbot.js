import Sidebar from "../components/sidebar";

const Chatbot = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 flex justify-center items-center page-">
        <div className="w-full max-w-4xl bg-white rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cybersecurity Chatbot</h2>
          <iframe
            src="http://localhost:8501" // Replace with the public URL if hosted
            style={{ width: "100%", height: "85vh", border: "none" }}
            title="Cybersecurity Chatbot"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
