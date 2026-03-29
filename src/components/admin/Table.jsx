import React from "react";

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>Sin registros</td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(row)
                      : row[col.key]}
                  </td>
                ))}

                {(onEdit || onDelete) && (
                  <td className="actions">
                    {onEdit && (
                      <button
                        className="btn-edit"
                        onClick={() => onEdit(row)}
                      >
                        Editar
                      </button>
                    )}

                    {onDelete && (
                      <button
                        className="btn-delete"
                        onClick={() => onDelete(row)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;