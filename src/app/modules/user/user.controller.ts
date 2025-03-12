const createStudent = async (req: Request, res: Response) => {
    try {
      const zodParsedData = StudentValidation.studentValidationSchema.parse(
        req.body,
      );
      // Extract the student data from the nested structure
      const result = await StudentService.createStudentIntoDB(zodParsedData.student);
      //send response
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Something went wrong',
        error: error 
      });
    }
  };