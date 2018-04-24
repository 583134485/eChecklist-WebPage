import { TempalteNamePipe } from './tempalte-name.pipe';

describe('TempalteNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TempalteNamePipe();
    expect(pipe).toBeTruthy();
  });
});
describe('templateName input filter', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  it(' "haha", "test", "SCHOOL" in template filter my input "SCHOOL" ', () => {
    const pipe = new TempalteNamePipe();
    const nameSet = ['haha', 'test', 'SCHOOL'];
    expect(pipe.transform(nameSet, 'SCHOOL')).toEqual(['SCHOOL']);
  });

  it(' "haha", "test", "SCHOOL" in template filter my input "School" ignore case', () => {
    const pipe = new TempalteNamePipe();
    const nameSet = ['haha', 'test', 'SCHOOL'];
    expect(pipe.transform(nameSet, 'School')).toEqual(['SCHOOL']);
  });

  // ... more tests ...
});
