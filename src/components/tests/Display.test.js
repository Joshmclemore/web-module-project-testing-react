import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');



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

test('renders without errors with no props', async () => { 
    render(<Display />)
    const button = await screen.findByText('Press to Get Show Data', { exact: false })
    expect(button).toBeVisible();
 });

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(showData);

    render(<Display />)
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument();
 });

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(showData);

    render(<Display />)
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const selectOptions = await screen.findAllByTestId('season-option');
    expect(selectOptions).toHaveLength(2);

});

test('displayFunc is called when the fetch button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(showData);

    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc} />)
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(()=> {
        expect(displayFunc).toBeCalled();
    })
})


/**### The Display Component
> *This component holds the state values of the application and handles api calls. In this component's tests, you work with mocking external modules and working with async / await / waitFor*

* [ ] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
* [ ] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called. */