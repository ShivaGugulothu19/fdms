import Layout from "../components/layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow text-center">
          <h3 className="text-xl font-semibold">Publications</h3>
          <p className="text-2xl mt-2 text-blue-600 font-bold">14</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow text-center">
          <h3 className="text-xl font-semibold">Events Attended</h3>
          <p className="text-2xl mt-2 text-green-600 font-bold">6</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow text-center">
          <h3 className="text-xl font-semibold">Profile Completion</h3>
          <p className="text-2xl mt-2 text-yellow-500 font-bold">85%</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
