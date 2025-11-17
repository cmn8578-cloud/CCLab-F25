class Rain {
    constructor(x, y, h) {
        this.x = x + random(-30, 30);
        this.y = y;
        this.h = h
    }
    display() {
        strokeWeight(5);
        stroke(this.h, 20, 100)
        line(this.x, this.y, this.x, this.y + 5);
    }
    update() {
        this.y += 10;
    }
    isOutCanvas() {
        if (this.y > height + 5) {
            return true;
        } else {
            return false;
        }
    }
}