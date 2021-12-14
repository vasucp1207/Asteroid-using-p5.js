"use strict";

/*
    matrix function
*/

class Matrix{
    constructor(rows, cols, data = []){
        this._rows = rows;
        this._cols = cols;
        this._data = data;

        // initialise with zeros if no data provided
        if(data == null || data.length == 0){
            this.data = [];
            for(let i = 0; i < this._rows; i++){
                this.data[i] = [];
                for(let j = 0; j < this._cols; j++){
                    this.data[i][j] = 0;
                }
            }
        }
        else{
            if(data.length != rows || dara[0].length != cols){
                throw new Error("Incorrect data dimenssion!");
            }
        }
    }

    get rows(){
        return this._rows;
    }
    get cols(){
        return this._cols;
    }
    get data(){
        return this._data;
    }

    // add two matrices
    static add(m0, m1){
        Matrix.checkDimenssions(m0, m1);
        let m = new Matrix(m0.rows, m0.cols);
        for(let i = 0; i < m.rows; i++){
            for(let j = 0; j < m.cols; j++){
                m.data[i][j] = m0.data[i][j] + m1.data[i][j];
            }
        }
        return m;
    }

    // subtraction
    static subtract(m0, m1){
        Matrix.checkDimenssions(m0, m1);
        let m = new Matrix(m0.rows, m0.cols);
        for(let i = 0; i < m.rows; i++){
            for(let j = 0; j < m.cols; j++){
                m.data[i][j] = m0.data[i][j] - m1.data[i][j];
            }
        }
        return m;
    }

    // multiply
    static multply(m0, m1){
        Matrix.checkDimenssions(m0, m1);
        let m = new Matrix(m0.rows, m0.cols);
        for(let i = 0; i < m.rows; i++){
            for(let j = 0; j < m.cols; j++){
                m.data[i][j] = m0.data[i][j] * m1.data[i][j];
            }
        }
        return m;
    }

    // dot product
    static dot(m0, m1){
        if(m0.cols != m1.rows){
            throw new Error("Matrix are not dot compatible");
        }
        let m = new Matrix(m0.rows, m1.cols);
        for(let i = 0; i < m.rows; i++){
            for(let j = 0; j < m.cols; j++){
                let sum = 0;
                for(let k = 0; k < m0.cols; k++){
                    sum += m0.data[i][k] * m1.data[k][j]; 
                }
                m.data[i][j] = sum;
            }
        }
        return m;
    }

    // convert array to a one-rowed matrix
    static convertFromArray(arr){
        return new Matrix(1, arr.length, [arr]);
    }

    // apply a function to each cell of the given matrix
    static map(m0, mFunction){
        let m = new Matrix(m0.rows, m0.cols);
        for(let i = 0; i < m.rows; i++){
            for(let j = 0; j < m.cols; j++){
                m.data[i][j] = mFunction(m0.data[i][j]);
            }
        }
        return m;
    }

    // transpose
    static transpose(m0){
        
    }

    // check matrices have the same dimenssions
    static checkDimenssions(m0, m1){
        if(m0.rows != m1.rows || m0.cols != m1.cols){
            throw new Error("Matrix are of different dimenssion")
        }
    }

    // apply random weight between 1 and -1
    randomWeights(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }
}