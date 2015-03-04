  describe("appCode",function(){

    var data;
    var email;

    beforeEach(function() {
      data = '{pet: value,human:gonzo,email:test@test.test}';
      spyOn(window, 'alert');
    });



    it("should convert data to a table",function(){
      table = myToArray(data);
      expect(table).toEqual(['pet','value','human','gonzo','email','test@test.test']);
    });

    it("should extract email",function(){
      table = myToArray(data);
      email=fetchEmail(table)[0];
      expect(email).toEqual('test@test.test');
    });

    // to improve the test most likely 
    // capybara
    it("should raise an error",function(){
      // expect(myError("ERROR")).toContain('ERROR');
      myError("ERROR");
      expect(window.alert).toHaveBeenCalledWith('ERROR');
     

    });

  });
