export class DataTransfer {
    private modelData: any; 
  
    setModelData(data: any): void {
      this.modelData = data;
    }
  
    // Method to get the data
    getModelData(): any {
      return this.modelData;
    }
  }
  