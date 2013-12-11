/*global describe, it, expect */

/* http://chaijs.com/api/bdd/ */

'use strict';
(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {

            it('should run here few assertions', function () {
            	expect(1).to.equal(1);
            	var foo = "";
            	expect(foo).to.be.a("string")
            });
            
        });
    });
})();
