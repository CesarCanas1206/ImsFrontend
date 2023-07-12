
/**
 * complianceRating
 * Total answered questions = U(2 & U===YES) + NC(2) + C(4) + CC(5)
 * Compliant answers = C(4) + CC(5)
 * Rating = round((complient / total) * 200, 2)
 * @param inspections
 * @returns rating as percentage
 */
export function complianceRating(inspections: any[]) {
  let totalQuestions: any = []
  let totalCompliant: any = []
  inspections.length &&
    inspections?.map((inspection: any) => {
      totalQuestions = Object.values(inspection).filter(
        (value: any) =>
          value === 'NC' || value === 'C' || value === 'CC' || value === 'NC',
      )
      totalCompliant = Object.values(inspection).filter(
        (value: any) => value === 'C' || value === 'CC',
      )
      return
    })
  return totalQuestions.length
    ? Math.round((totalCompliant.length / totalQuestions.length) * 100).toFixed(
        2,
      )
    : 0
}
