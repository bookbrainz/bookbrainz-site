/* eslint-disable prefer-arrow-callback,func-names */
/*
 * Copyright (C) 2019  Akhilesh Kumar
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */


import app from '../../../../src/api/app';
import chai from 'chai';
import chaiHttp from 'chai-http';


chai.use(chaiHttp);
const {expect} = chai;

const searchString = 'Harry';
/* eslint-disable */

describe('GET /search', () => {
	// Test search endpoint
	it('should get search result for given search query parameter only searchString', async function () {
		const res = await chai.request(app).get(`/search?q=${searchString}`);
		expect(res.status).to.equal(200);
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.all.keys(
			'resultCount',
			'searchResult'
		);
		expect(res.body.resultCount).to.be.a('number');
		expect(res.body.searchResult).to.be.an('array');
		expect(res.body.searchResult[0]).to.be.an('object');
		expect(res.body.searchResult[0]).to.have.all.keys(
			'bbid',
			'defaultAlias',
			'entityType'
		);

	 });
	 it('should get search result for given search query parameters including collection type', async function () {
		const res = await chai.request(app).get(`/search?q=${searchString}&collection=work`);
		expect(res.status).to.equal(200);
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.all.keys(
			'resultCount',
			'searchResult'
		);
		expect(res.body.resultCount).to.be.a('number');
		expect(res.body.searchResult).to.be.an('array');
		expect(res.body.searchResult[0]).to.be.an('object');
		expect(res.body.searchResult[0]).to.have.all.keys(
			'bbid',
			'defaultAlias',
			'entityType'
		);		
		expect(res.body.searchResult[0].entityType).to.equal('Work');
	 });
});
