class Food{
    constructor(){
 this.foodStock;
 this.lastFed;
 this.milkBottle=loadImage("Milk.png")
    }
    display(){
        var x=80,y=100;
        imageMode(CENTER);
        image(this.milkBottle,720,220,70,70);
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
            image(this.milkBottle,x,y,50,50);
            x=x+30;
        }
    }
      }
      getFoodStock(){
       return this.foodStock;
      }

      updateFoodStock(foodS){
      this.foodStock=foodS;
      }

      deductFood(){
      this.foodStock=this.foodStock-1;
      }
}