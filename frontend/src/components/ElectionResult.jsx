import axios from "axios";
import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.addVirtualFileSystem(pdfFonts);

export function ElectionResult() {
  const [election, setElection] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/dashboard/result");
        setElection(result.data.message);
      } catch (error) {
        console.log("Error fetching results:", error);
      }
    };
    getResult();
  }, []);

  const docDefinition = {
    content: [
      {
        text: "Election Results",
        style: "header",
        alignment: "center",
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto"],
          body: [
            ["Name", "Party", "Votes"],
            ...election.map((result) => [
              result.name,
              result.party || "N/A",
              result.votes || 0,
            ]),
          ],
        },
        layout: "lightHorizontalLines",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableExample: {
        fontSize: 12,
        margin: [0, 5],
      },
    },
  };

  const testDownload = () => {
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download("Election result.pdf");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Election Results</h2>
      <button
        className="w-full bg-blue-500 text-black p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        onClick={testDownload}
      >
        Download Election Results as PDF
      </button>

      {election.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full overflow-x-auto mt-6">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-50 text-gray-700">
                <th className="w-[300px] p-4 text-left border-b border-gray-200 font-semibold">Name</th>
                <th className="w-[200px] p-4 text-left border-b border-gray-200 font-semibold">Party</th>
                <th className="w-[100px] p-4 text-left border-b border-gray-200 font-semibold">Votes</th>
              </tr>
            </thead>
            <tbody>
              {election.map((elec) => (
                <tr key={elec._id} className="hover:bg-gray-50 transition-colors">
                  <td className="w-[300px] p-4 text-left border-b border-gray-200 text-gray-800">{elec.name}</td>
                  <td className="w-[200px] p-4 text-left border-b border-gray-200 text-gray-600">{elec.party || "N/A"}</td>
                  <td className="w-[100px] p-4 text-left border-b border-gray-200 text-gray-800">{elec.votes || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No election results found</p>
      )}
    </div>
  );
}

export default ElectionResult;
