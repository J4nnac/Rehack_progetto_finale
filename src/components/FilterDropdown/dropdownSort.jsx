/* eslint-disable react/prop-types */

export default function DropdownSort({ sortOption, setSortOption }) {
    const getSortLabel = () => {
        switch (sortOption) {
            case "date":
                return "Data di caricamento";
            case "relevance":
                return "Rilevanza";
            case "name":
                return "Nome";
            case "popularity":
                return "Popolarità";
            case "score":
                return "Punteggio";
            default:
                return "Data di caricamento";
        }
    };

    return (
        <div className="dropdown">
            <a className="btn btnDropdown mt-0 ms-0 dropdown-toggle border-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ordina per: <span className="fw-bold">{getSortLabel()}</span>
            </a>
            <ul className="dropdown-menu list-unstyled">
                <li className="text-decoration-none">
                    <a className="dropdown-item" onClick={() => setSortOption("date")}>
                        Data di caricamento
                    </a>
                </li>
                <li className="text-decoration-none">
                    <a className="dropdown-item" onClick={() => setSortOption("relevance")}>
                        Rilevanza
                    </a>
                </li>
                <li className="text-decoration-none">
                    <a className="dropdown-item" onClick={() => setSortOption("name")}>
                        Nome
                    </a>
                </li>
                <li className="text-decoration-none">
                    <a className="dropdown-item" onClick={() => setSortOption("popularity")}>
                        Popolarità
                    </a>
                </li>
                <li className="text-decoration-none">
                    <a className="dropdown-item" onClick={() => setSortOption("score")}>
                        Punteggio
                    </a>
                </li>
            </ul>
        </div>
    );
}
