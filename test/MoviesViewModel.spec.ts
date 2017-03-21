import MoviesViewModel from '../src/MoviesViewModel';
import {movieDataService, Movie} from '../src/MovieDataService'
import {expect} from 'chai';
import Sinon = require("sinon");

describe('MoviesViewModel', () => {
    let viewModel: MoviesViewModel;
    let movieDataServiceStub: Sinon.SinonSpy;
    beforeEach(() => {
        let movies = [
            new Movie('The Matrix', 1998, 5),
            new Movie('The Matrix Reloaded', 2003, 6)
        ];
        Sinon.stub(movieDataService, 'loadMovies').returns(movies);
        movieDataServiceStub = Sinon.spy(movieDataService, 'save');
        viewModel = new MoviesViewModel();
    });

    afterEach(() => {
        Sinon.restore(movieDataService.loadMovies);
        Sinon.restore(movieDataService.save);
    });

    it('should load movies', () => {
        expect(viewModel.movies.length).to.be.equal(2);
    });

    it('should be able to select a movie', () => {
        viewModel.select(viewModel.movies[0]);
        expect(viewModel.selectedMovie).to.be.equal(viewModel.movies[0]);
    });

    it('should save rated movie', () => {
        viewModel.select(viewModel.movies[0]);
        viewModel.rate(4);
        expect(movieDataServiceStub.called).to.be.true;
    });

});