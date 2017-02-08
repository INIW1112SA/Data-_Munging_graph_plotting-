const should = require('chai').should();
const expect = require('chai').expect;
const sinon = require('sinon');
const readline = require('readline');
const fs=require('fs');
convert = require('../js/foodFactConverterAswini.js');
describe('Test Application as WhiteBox', function(){
  it('should fail if input is not provided', function(done){
       expect(convert).to.throw(Error, "It is not an array");
       done();
   });
  it('should be an array', function(done){
    expect(convert.bind('undefined',8575)).to.throw(Error,'It is not an array');
       done();
    });
  it('should check the length', function(done){
    expect(convert.bind('undefined',[])).to.throw(Error,'the array does not have any value');
        done();
    });
  it('should check the array values', function(done){
      expect(convert.bind('undefined',['Netherlands', 'Canada', 'United Kingdom','United States',
      'Australia', 'France', 'Germany', 'Spain', 'South Africa'])).to.not.throw(Error,'the array is  well defined');
          done();
    });
    it('should output success message at last ', function(done){
          var result=convert(['Netherlands', 'Canada', 'United Kingdom',
         'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'])
          result.should.be.equal('JSON written successfully');
           done();
    });
  });
    describe('Test createInterface method of readline', function(err) {
    it('should be called only once', function() {
                var spyCreateInterface = sinon.spy(readline, 'createInterface');
                convert(['Netherlands', 'Canada', 'United Kingdom',
               'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa']);
                readline.createInterface.restore();
                sinon.assert.calledOnce(spyCreateInterface);
        });
      });
        describe('Test on method of Interface for line event', function(err){
        it('should be called with the line event', function() {
               var stub = sinon.stub(readline.Interface.prototype, 'on');
               convert(['Netherlands', 'Canada', 'United Kingdom',
              'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa']);
               sinon.assert.called(stub);
               readline.Interface.prototype.on.restore();
               sinon.assert.calledWith(stub, 'line');

        });
       });

        describe('Test on method of Interface for close event', function(err) {
        it('should be called with the close event', function() {
               var stub = sinon.stub(readline.Interface.prototype,'on');
               convert(['Netherlands', 'Canada', 'United Kingdom',
              'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa']);
               readline.Interface.prototype.on.restore();
               sinon.assert.calledWith(stub, 'close');
        });
});
