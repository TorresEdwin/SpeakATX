// Filename - pages/about.js

import React from "react";
import styled from "styled-components";

// Table styling
const Table = styled.table`
    width: 100%;
    margin: 20px 0;
    border-radius: 15px; /* Rounds the corners of the table */
    overflow: hidden; /* Ensures the rounded corners of the table are applied */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adds subtle shadow */
    border-collapse: separate; /* Ensures cells don't collapse into each other */
    border-spacing: 10px; /* Adds space between the cells */
`;

// Styling for table cells (increased size with background image)
const TableCell = styled.td`
    text-align: center;
    padding: 0; /* Remove padding to ensure image fits the entire cell */
    border: 1px solid #ddd;
    width: 150px;
    height: 150px;
    border-radius: 10px; /* Rounds the corners of individual cells */
    background-image: url(${(props) => props.imageUrl}); /* Set the image as background */
    background-size: cover; /* Ensures the image completely covers the cell */
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents the image from repeating */
`;

// Button style (increased size, but now sits on top of the background image)
const Button = styled.button`
    background-color: rgba(255, 255, 255, 0.5); /* Slightly transparent background */
    border: none;
    padding: 20px;
    cursor: pointer;
    width: 120px; /* Increased width */
    height: 120px; /* Increased height */
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px; /* Rounds the corners of the buttons */
    &:hover {
        opacity: 0.8; /* Optional: Slight fade on hover */
    }
`;

const CommunitiesPage = () => {
    return (
        <div>
            <h1>Communities</h1>
            <Table>
                <tbody>
                    {[...Array(2)].map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {[...Array(5)].map((_, colIndex) => (
                                <TableCell
                                    key={colIndex}
                                    imageUrl="https://via.placeholder.com/150"  // Use a larger placeholder image
                                >
                                    <Button />
                                </TableCell>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CommunitiesPage;
