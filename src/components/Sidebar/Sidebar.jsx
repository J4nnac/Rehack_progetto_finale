import DropdownGenre from "../FilterDropdown/dropdownGenre";
import DropdownPlatform from "../FilterDropdown/dropdownPlatform";


export default function Sidebar() {
    return (
<div className="dropdown-container d-none d-md-flex m-0">
                    <DropdownGenre />
                    <DropdownPlatform />
                </div>
    );
}
