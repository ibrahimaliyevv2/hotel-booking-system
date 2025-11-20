const DailyConfiguration = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl mb-6 font-bold">Daily configuration</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Day</th>
              <th>Hotel</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyConfiguration;
