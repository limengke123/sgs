import {Compiler} from "../src/compiler";

describe('测试compiler', () => {

    describe('单条的编译处理(unitCompile)', () => {
        const compiler = new Compiler()

        it('应该能正常替换普通字符', function () {
            const testData = {
                name: 'sgs',
                age: 18
            }
            const content = 'name'
            compiler.setRawData(testData)
            let result = compiler.unitCompile(content)
            expect(result).toBe(testData.name)
        })

        it('应该能正常处理表达式', function () {
            expect(compiler.unitCompile('1 + 1')).toBe(2)
        })

        it('应该能处理普通三元表达式', function () {
            expect(compiler.unitCompile(" 3 > 2 ? 'yes' : 'no'")).toBe('yes')
        })


        it('应该能处理复杂的三元表单式', function () {
            expect(compiler.unitCompile('age > 18 ? "yes" : "no"')).toBe('no')
        })

        it('应该能处理undefined的情况', function () {
            compiler.setRawData({})
            expect(compiler.unitCompile('name')).toBe('')
        })


        it('处理正则的情况', () => {
            compiler.setRawData({name: 'Result<string>'})
            expect(compiler.unitCompile('name.replace(/Result\<(.*)\>/g, (_, b) => b)')).toBe('string')
        })
    })


    describe('整体模版测试', () => {
        const compiler = new Compiler()
        it('普通的整体数据，只包含数据替换', function () {
            const defaultFunctionDeclaration = `
                /**
                 * @name {{methodName}}
                 * @description {{comment}}
                 * */
                export function {{methodName}}(opts: {{requestModelName}}) {
                  return instance<{{responseModelName}}>({
                    method: '{{methodType}}',
                    url: '{{path}}',
                    opts: opts
                  });
                }
                `

            const result = `
                /**
                 * @name queryActiveDetail
                 * @description 根据uid获取活动详情
                 * */
                export function queryActiveDetail(opts: queryActiveDetailRequest) {
                  return instance<ActiveDTO>({
                    method: 'get',
                    url: '/active/queryActiveDetail.json',
                    opts: opts
                  });
                }
                `

            compiler.setRawData({
                methodName: 'queryActiveDetail',
                comment: '根据uid获取活动详情',
                requestModelName: 'queryActiveDetailRequest',
                responseModelName: 'ActiveDTO',
                methodType: 'get',
                path: '/active/queryActiveDetail.json'
            })
            compiler.setRawString(defaultFunctionDeclaration)
            expect(compiler.compile()).toBe(result)
        })


        it('能够处理一些正常的判断条件', function () {
           const rawString = `
                /**
                 * @description {{comment}}
                 * {{comment ? comment : '这里是一个默认的方法介绍'}}
                 * */`
            let rawData = {
               comment: '根据uid获取活动详情'
            }
            const result1 = `
                /**
                 * @description 根据uid获取活动详情
                 * 根据uid获取活动详情
                 * */`
            let rawData2 = {
               comment: ''
            }
            const result2 = `
                /**
                 * @description 
                 * 这里是一个默认的方法介绍
                 * */`
            compiler.setRawString(rawString)

            compiler.setRawData(rawData)
            expect(compiler.compile()).toBe(result1)

            compiler.setRawData(rawData2)
            expect(compiler.compile()).toBe(result2)
        })

    })

})

