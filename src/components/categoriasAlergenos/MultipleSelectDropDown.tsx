import React, { useState, useEffect, useRef, FC } from 'react';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';

interface IMultiSelectDropdownProps {
    options: IAlergenos[];         // Array of options with id and label
    selectedValues: number[];           // Array of selected option IDs
    onChange: (selected: number[]) => void; // Callback for when selected values change
}

export const MultiSelectDropdown: React.FC<IMultiSelectDropdownProps> = ({ options, selectedValues, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle checkbox change
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const id = parseInt(value);

        const updatedValues = checked
            ? [...selectedValues, id] // Add selected value
            : selectedValues.filter((item) => item !== id); // Remove unselected value

        onChange(updatedValues); // Call the parent onChange function with updated values
    };

    return (
        <div className="multiSelectDropdown" ref={dropdownRef}>
            <div className="dropdownHeader" onClick={toggleDropdown} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' ,color:"black"}}>
                Selecione Alergenos
            </div>
            {isOpen && (
                <div className="dropdownOptions" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px', position: 'absolute', backgroundColor: 'white', zIndex: 1000 }}>
                    {options.map((option) => (
                        <label key={option.id} style={{ display: 'block', color: 'black' }}>
                            <input
                                type="checkbox"
                                value={option.id.toString()}
                                checked={selectedValues.includes(option.id)}
                                onChange={handleCheckboxChange}
                            />
                            {option.denominacion}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
