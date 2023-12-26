using Microsoft.ReactNative.Managed;
using System;

namespace calculatorCs
{
    [ReactModule]
    public class CalculatorModule
    {
        [ReactMethod("calculate")]
        public void Calculate(double firstNumber, double secondNumber, string operatorValue, IReactPromise<JSValue> promise)
        {
            try
            {
                double result = 0;
                switch (operatorValue)
                {
                    case "+":
                        result = firstNumber + secondNumber;
                        break;
                    case "-":
                        result = firstNumber - secondNumber;
                        break;
                    case "*":
                        result = firstNumber * secondNumber;
                        break;
                    case "/":
                        if (secondNumber == 0)
                        {
                            throw new DivideByZeroException();
                        }
                        result = firstNumber / secondNumber;
                        break;
                    default:
                        throw new Exception("invalid operator.");
                }

                promise.Resolve(result);
            }
            catch (Exception ex)
            {
            }
        }
    }
}