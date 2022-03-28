import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const showData = {
    name: 'test show',
    summary: 'test summary',
    seasons: [
        {
            id: 0, name: 'one', episodes: []
        }, 
        {
            id: 1, name: 'two', episodes: []
        }]
}


test('renders without errors', () => { 
    render(<Show show={showData} selectedSeason={'none'}/>);
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} selectedSeason={'none'}/>);
    const loadingComponent = screen.queryByTestId('loading-container')
    const altLoadingComponent = screen.queryByText('Fetching', { exact: false })
    expect(loadingComponent).toBeInTheDocument();
    expect(altLoadingComponent).toBeVisible();
 });

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={showData} selectedSeason={'none'}/>);
    const seasonOptions = screen.queryAllByTestId('season-option', { exact: false })
    expect(seasonOptions).toHaveLength(2)
    screen.debug();
 });

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show show={showData} selectedSeason={'none'} handleSelect={handleSelect}/>);
    const seasonSelector = screen.getByLabelText('Select A Season', { exact: false })
    fireEvent.change(seasonSelector, { target: { value: '0'}});

    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={showData} selectedSeason={'none'}/>)
    let episodeComponent = screen.queryByTestId('episodes-container', { exact: false })
    expect(episodeComponent).not.toBeInTheDocument();

    rerender(<Show show={showData} selectedSeason={1} />)
    episodeComponent = screen.queryByTestId('episodes-container', { exact: false })

    expect(episodeComponent).toBeInTheDocument();
 });