export interface ICalculatorModule
{
    calculate(firstNumber: number, secondNumber: number, operatorValue: string): Promise<number>;
}

declare module "react-native"{
    interface NativeModulesStatic{
        CalculatorModule: ICalculatorModule
    }
}