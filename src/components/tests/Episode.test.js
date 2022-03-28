import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisode = {
    id: 1,
    name: "test name",
    image: 'https://i.ibb.co/2FsfXqM/stranger-things.png',
    season: 1,
    number: 1,
    summary: "test summary",
    runtime: 1
}

const testEpisodeWithNullImage = {
    id: 1,
    name: "test name",
    image: null,
    season: 1,
    number: 1,
    summary: "test summary",
    runtime: 1
}

test("renders without error", () => {
    render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", () => { 
    render(<Episode episode={testEpisode} />);
    const summary = screen.queryByText('test summary', { exact: false })
    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent('test summary')
 });

test("renders default image when image is not defined", () => { 
    render(<Episode episode={testEpisodeWithNullImage} />);
    const altTag = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png', { exact: false })
    console.log(altTag)
    expect(altTag).toBeInTheDocument();
 });
