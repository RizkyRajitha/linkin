import React, { useEffect, useState } from "react";
const Table = ({ name }) => {
  return (
    <>
      <div className="col-6 p-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">{name}</th>
              <th scope="col"></th>
              <th scope="col" className="text-end">
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>@mdo</td>
              <td></td>
              <td className="text-end">@mdo</td>
            </tr>
            <tr>
              <td>@mdo</td>
              <td></td>
              <td className="text-end">@fat</td>
            </tr>
            <tr>
              <td>@mdo</td>
              <td></td>
              <td className="text-end">@fat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
